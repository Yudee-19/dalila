import { useState, useEffect, useRef } from "react";
import { diamondApi } from "@/lib/api";
import type { DiamondData } from "@/types/diamond.types";

interface FilterParams {
    [key: string]: string | number | boolean | string[] | number[] | undefined;
}

interface UseDiamondDataProps {
    filters: FilterParams;
    currentPage: number;
    rowsPerPage: number;
    isLoggedIn?: boolean | null;
}

interface UseDiamondDataReturn {
    data: DiamondData[];
    loading: boolean;
    error: string | null;
    totalRecords: number;
    totalPages: number;
    hasLoadedOnce: boolean;
    isPublicApi: boolean; // Add this
}

/**
 * Custom hook to fetch diamond data from API
 * Handles loading states, errors, and pagination
 * Prevents duplicate API calls for same parameters
 */
export const useDiamondData = ({
    filters,
    currentPage,
    rowsPerPage,
    isLoggedIn = null,
}: UseDiamondDataProps): UseDiamondDataReturn => {
    const [data, setData] = useState<DiamondData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isPublicApi, setIsPublicApi] = useState(!isLoggedIn); // Add this

    const prevFetchParamsRef = useRef<string>("");
    const hasLoadedOnce = useRef(false);
    const activeRequestIdRef = useRef(0);

    useEffect(() => {
        // Wait until auth state is known to avoid firing a public request first.
        if (isLoggedIn === null) {
            return;
        }

        const fetchDiamonds = async () => {
            const requestId = ++activeRequestIdRef.current;

            try {
                setLoading(true);
                setError(null);
                setIsPublicApi(!isLoggedIn); // Update this

                // Create unique key for current request to prevent duplicate fetches
                const fetchParamsKey = JSON.stringify({
                    ...filters,
                    currentPage,
                    rowsPerPage,
                    isLoggedIn,
                });

                // Skip if same parameters as previous fetch
                if (prevFetchParamsRef.current === fetchParamsKey) {
                    setLoading(false);
                    return;
                }

                prevFetchParamsRef.current = fetchParamsKey;

                // Build API request parameters
                const apiFilters: FilterParams = {
                    page: currentPage,
                    limit: rowsPerPage,
                    ...filters,
                };

                // Use public API if not logged in, otherwise use authenticated API
                const response = isLoggedIn
                    ? await diamondApi.search(apiFilters)
                    : await diamondApi.getPublic(apiFilters);

                // Ignore outdated responses from earlier requests.
                if (requestId !== activeRequestIdRef.current) {
                    return;
                }

                if (response?.success && response.data) {
                    // Parse response data
                    let diamonds: DiamondData[];
                    if (Array.isArray(response.data)) {
                        diamonds = response.data as unknown as DiamondData[];
                    } else if (
                        response.data.diamonds &&
                        Array.isArray(response.data.diamonds)
                    ) {
                        diamonds = response.data
                            .diamonds as unknown as DiamondData[];
                    } else {
                        diamonds = [];
                    }

                    setData(diamonds);
                    hasLoadedOnce.current = true;

                    // Extract pagination info from response
                    const extendedResponse = response as typeof response & {
                        pagination?: {
                            totalRecords?: number;
                            totalPages?: number;
                        };
                        totalFilteredRecords?: number;
                    };

                    if (extendedResponse.pagination) {
                        setTotalRecords(
                            extendedResponse.pagination.totalRecords ||
                                extendedResponse.totalFilteredRecords ||
                                0,
                        );
                        setTotalPages(
                            extendedResponse.pagination.totalPages || 0,
                        );
                    } else if (
                        extendedResponse.totalFilteredRecords !== undefined
                    ) {
                        setTotalRecords(extendedResponse.totalFilteredRecords);
                        setTotalPages(
                            Math.ceil(
                                extendedResponse.totalFilteredRecords /
                                    rowsPerPage,
                            ),
                        );
                    } else if (response.data.pagination) {
                        setTotalRecords(
                            response.data.pagination.totalItems || 0,
                        );
                        setTotalPages(response.data.pagination.totalPages || 0);
                    } else {
                        setTotalRecords(diamonds.length);
                        setTotalPages(1);
                    }
                } else {
                    setData([]);
                    setTotalRecords(0);
                    setTotalPages(0);
                    hasLoadedOnce.current = true;
                }
            } catch (err) {
                if (requestId !== activeRequestIdRef.current) {
                    return;
                }
                console.error("Error fetching diamonds:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch diamonds",
                );
                setData([]);
            } finally {
                if (requestId === activeRequestIdRef.current) {
                    setLoading(false);
                }
            }
        };

        fetchDiamonds();
    }, [filters, currentPage, rowsPerPage, isLoggedIn]);

    return {
        data,
        loading,
        error,
        totalRecords,
        totalPages,
        hasLoadedOnce: hasLoadedOnce.current,
        isPublicApi, // Add this
    };
};
