"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHeaderAuth } from "./headerHooks";

export default function MobileHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const router = useRouter();

    const {
        userRole,
        isLoggedIn,
        isCheckingAuth,
        isAdmin,
        isInventoryAccessible,
        handleLogout,
    } = useHeaderAuth();

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
        setIsUserPanelOpen(false);
        setIsAdminPanelOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#050c3a] shadow-lg w-full" style={{overflowX: 'hidden'}}>
            <div className="flex items-center px-2 py-2 w-full flex-nowrap" style={{overflow: 'visible'}}>
                {/* Logo */}
                <button
                    onClick={() => {
                        router.push("/");
                        closeMobileMenu();
                    }}
                    className="flex-shrink-0 focus:outline-none"
                    aria-label="Go to home page"
                >
                    <div className="relative h-10 w-16">
                        <Image
                            src="/dalila_img/mobile-logo.png"
                            alt="Dalila Diamonds"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                </button>

                {/* Main visible menu buttons (responsive) */}
                <div className="flex-1 flex items-center justify-center gap-1 min-w-0">
                    <button
                        onClick={() => {
                            router.push("/contact");
                            closeMobileMenu();
                        }}
                        className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap font-normal"
                        style={{ minWidth: 64 }}
                    >
                        Contact Us
                    </button>
                    {!isLoggedIn && !isCheckingAuth ? (
                        <>
                            <button
                                onClick={() => {
                                    router.push("/register");
                                    closeMobileMenu();
                                }}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap font-normal"
                                style={{ minWidth: 64 }}
                            >
                                Register
                            </button>
                            <button
                                onClick={() => {
                                    router.push("/login");
                                    closeMobileMenu();
                                }}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap font-normal"
                                style={{ minWidth: 64 }}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={(e) => {
                                    if (typeof window !== "undefined") {
                                        const closeModalEvent = new CustomEvent("close-diamond-modal");
                                        window.dispatchEvent(closeModalEvent);
                                    }
                                    if (isInventoryAccessible) {
                                        router.push("/inventory");
                                        closeMobileMenu();
                                    } else {
                                        e.preventDefault();
                                        alert("Your account is pending approval. Please wait for admin verification to access the inventory.");
                                    }
                                }}
                                disabled={!isInventoryAccessible}
                                className={`px-2 py-1 text-xs border border-[#c89e3a] rounded whitespace-nowrap font-normal ${isInventoryAccessible ? "text-white hover:bg-[#c89e3a] hover:text-white cursor-pointer" : "text-gray-400 bg-gray-700 cursor-not-allowed opacity-60"}`}
                                style={{ minWidth: 64 }}
                                title={!isInventoryAccessible ? "Your account is pending approval" : ""}
                            >
                                Inventory
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMobileMenu();
                                }}
                                className="px-2 py-1 text-xs text-white border border-[#c89e3a] rounded hover:bg-[#c89e3a] hover:text-white transition-colors whitespace-nowrap font-normal"
                                style={{ minWidth: 64 }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Hamburger Menu Button - always on right, never hidden or scrolled */}
                <div className="flex-shrink-0 flex items-center justify-end" style={{minWidth: 48, position: 'relative'}}>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-[#c89e3a] p-2 ml-2"
                        aria-label="Toggle menu"
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, top: 0, height: '100%'}}>
                        {isMobileMenuOpen ? (
                            <X size={32} />
                        ) : (
                            <Menu size={32} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown (all other menus) */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#050c3a] border-t border-[#c89e3a] shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
                    <nav className="py-2">
                        {/* Authentication Section (only for logged in) */}
                        {isCheckingAuth ? (
                            <div className="px-4 py-4 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 text-[#c89e3a] animate-spin" />
                            </div>
                        ) : isLoggedIn ? (
                            <>
                                {/* User Panel - For regular users */}
                                {!isAdmin && (
                                    <div className="border-b border-gray-700">
                                        <button
                                            onClick={() => setIsUserPanelOpen(!isUserPanelOpen)}
                                            className="w-full px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors flex items-center justify-between"
                                        >
                                            <span className="text-sm font-medium">USER PANEL</span>
                                            <ChevronDown size={18} className={`transition-transform ${isUserPanelOpen ? "rotate-180" : ""}`} />
                                        </button>
                                        {isUserPanelOpen && (
                                            <div className="bg-[#0a1454]">
                                                <Link href="/dashboard" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Dashboard</Link>
                                                <Link href="/enquiry" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Enquiry</Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* Admin Panel - For admins */}
                                {isAdmin && (
                                    <div className="border-b border-gray-700">
                                        <button
                                            onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
                                            className="w-full px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors flex items-center justify-between"
                                        >
                                            <span className="text-sm font-medium">ADMIN PANEL</span>
                                            <ChevronDown size={18} className={`transition-transform ${isAdminPanelOpen ? "rotate-180" : ""}`} />
                                        </button>
                                        {isAdminPanelOpen && (
                                            <div className="bg-[#0a1454]">
                                                <Link href="/inventory-management" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Inventory & Suppliers</Link>
                                                <Link href="/member" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Members</Link>
                                                <Link href="/customer-management" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Customer Management</Link>
                                                <Link href="/buy-form" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Buy Form Submissions</Link>
                                                <Link href="/limitedEdition" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Limited Edition</Link>
                                                {userRole === "SUPER_ADMIN" && (
                                                    <Link href="/create-admin" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">Create Admin</Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* Logout Button */}
                                <div className="px-4 py-3 border-b border-gray-700">
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeMobileMenu();
                                        }}
                                        className="w-full px-4 py-2.5 text-sm text-white border border-[#c89e3a] hover:bg-[#c89e3a] transition-colors rounded"
                                    >
                                        LOGOUT
                                    </button>
                                </div>
                            </>
                        ) : null}

                        {/* Main Navigation (inside hamburger) */}
                        <Link href="/aboutUs" onClick={closeMobileMenu} className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors">About Us</Link>
                        <div className="border-t border-gray-700">
                            <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="w-full px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors flex items-center justify-between">
                                <span>Our Services</span>
                                <ChevronDown size={18} className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isServicesOpen && (
                                <div className="bg-[#0a1454]">
                                    <Link href="/secure-to-source" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">S2S - Secure To Source</Link>
                                    <Link href="/diamond-source" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">DS4U - Diamond Source For You</Link>
                                    <Link href="/sud" onClick={closeMobileMenu} className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#c89e3a]/10">SYD - Sell Your Diamonds</Link>
                                </div>
                            )}
                        </div>
                        <Link href="/diamondKnowledge" onClick={closeMobileMenu} className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-t border-gray-700">Diamond Knowledge</Link>
                        <Link href="/blogs" onClick={closeMobileMenu} className="block px-4 py-3 text-white hover:bg-[#c89e3a]/10 transition-colors border-t border-gray-700">Blogs</Link>
                    </nav>
                </div>
            )}

            {/* Tagline */}
            {/* <div className="w-full h-[2px] bg-[#C89E3A]"></div>
            <div className="flex justify-center py-2 px-4">
                <p className="text-xs text-center text-white">
                    <span>Where Trust Shines,</span>
                    <span> And Quality Sparkles</span>
                </p>
            </div> */}
        </header>
    );
}
