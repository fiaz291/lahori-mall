'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function PrivacyPolicy() {
    const router = useRouter();
    const handleRedirect = (redirectTo) => {
        router.push(redirectTo);
    };

    return (
        <div>
            <Navbar hideSlider topbar />
            <div className='flex justify-center mt-10'>
                <img
                    src="/logo-dark.png"
                    className="w-[300px] h-[150px] cursor-pointer hover:opacity-80"
                    onClick={() => {
                        handleRedirect("/");
                    }}
                />
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col w-full max-w-[1200px] mt-4 mx-14 gap-5 ">
                    <h1 className='text-center text-[42px]'>Privacy Policy</h1>
                    <section>
                        <p>At <strong>THE KOREAN STOP</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or use our services. By accessing or using our website, you consent to the terms of this Privacy Policy.</p>
                    </section>

                    <section>
                        <h2>Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> This includes your name, email address, phone number, shipping address, and billing information when you place an order or register an account.</li>
                            <li><strong>Payment Information:</strong> We use secure third-party payment processors to handle your payment information, such as credit card details.</li>
                            <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, operating system, pages visited, and time spent on the website.</li>
                            <li><strong>Cookies:</strong> Small files stored on your device to improve user experience and gather analytics.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>How We Use Your Information</h2>
                        <p>We use the information collected to:</p>
                        <ul>
                            <li>Process your orders and manage your account.</li>
                            <li>Provide customer support and respond to your inquiries.</li>
                            <li>Send updates about your order status and promotions (if opted-in).</li>
                            <li>Improve our website, services, and user experience.</li>
                            <li>Analyze website performance and usage trends.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>How We Protect Your Information</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information, including:</p>
                        <ul>
                            <li>Secure Sockets Layer (SSL) encryption for secure transmission of data.</li>
                            <li>Restricted access to personal information to authorized personnel only.</li>
                            <li>Regular monitoring of our website for vulnerabilities.</li>
                        </ul>
                        <p>However, no online transmission of data is entirely secure, and we cannot guarantee the absolute security of your information.</p>
                    </section>

                    <section>
                        <h2>Sharing Your Information</h2>
                        <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> Third-party companies that help us operate our business, such as payment processors, shipping providers, or email services.</li>
                            <li><strong>Legal Compliance:</strong> Authorities or regulators if required by law or to protect our rights.</li>
                            <li><strong>Business Transfers:</strong> If our company is involved in a merger, sale, or acquisition, your information may be transferred as part of the transaction.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Cookies and Tracking Technologies</h2>
                        <p>We use cookies and similar technologies to enhance your experience on our website. Cookies allow us to:</p>
                        <ul>
                            <li>Remember your preferences and login details.</li>
                            <li>Track website performance and analytics.</li>
                            <li>Deliver targeted advertisements.</li>
                        </ul>
                        <p>You can disable cookies through your browser settings, but this may limit your access to certain features of our website.</p>
                    </section>

                    <section>
                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access, update, or delete your personal information.</li>
                            <li>Opt out of receiving promotional emails by clicking the "unsubscribe" link in our communications.</li>
                            <li>Request details on how we process your data.</li>
                        </ul>
                        <p>To exercise your rights, please contact us using the information below.</p>
                    </section>

                    <section>
                        <h2>Third-Party Links</h2>
                        <p>Our website may include links to third-party websites. We are not responsible for the privacy practices or content of these websites. Please review their privacy policies before sharing your personal information.</p>
                    </section>

                    <section>
                        <h2>Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last Updated" date. Please review this page periodically to stay informed.</p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
                        <p><strong>Email:</strong> support@thekoreanstop.com</p>
                        <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                        <p><strong>Address:</strong> 123 Korean Stop Street, Seoul, South Korea</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}