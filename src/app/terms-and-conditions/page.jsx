'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function TermsAndConditions() {
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
                    <h1 className='text-center text-[42px]'>Terms and Conditions</h1>
                    <section>
                        <p>Welcome to <strong>THE KOREAN STOP</strong>. By using our website (referred to as "we," "our," or "us"), you agree to comply with the following terms and conditions. Please read these terms carefully before using our services. If you do not agree with any part of these terms, you must not use our website.</p>
                    </section>

                    <section>
                        <h2>1. Use of the Website</h2>
                        <p>You agree to use this website for lawful purposes only. You must not:</p>
                        <ul>
                            <li>Engage in any fraudulent or illegal activities.</li>
                            <li>Disrupt the functionality or security of the website.</li>
                            <li>Submit false or misleading information.</li>
                            <li>Attempt to gain unauthorized access to any part of the website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>2. Product Information</h2>
                        <p>All products listed on <strong>THE KOREAN STOP</strong> are subject to availability. We strive to ensure that product descriptions, images, and prices are accurate, but we do not guarantee the accuracy or completeness of the information provided. We reserve the right to correct any errors, inaccuracies, or omissions and to update product information without prior notice.</p>
                    </section>

                    <section>
                        <h2>3. Orders and Payments</h2>
                        <p>When you place an order with us, you agree to provide accurate and complete information. We reserve the right to cancel or refuse any order for any reason, including but not limited to:</p>
                        <ul>
                            <li>Product unavailability.</li>
                            <li>Errors in pricing or product description.</li>
                            <li>Suspicion of fraudulent activity.</li>
                        </ul>
                        <p>All payments must be made through the payment methods provided on our website. We use secure third-party payment processors to handle your payment information.</p>
                    </section>

                    <section>
                        <h2>4. Shipping and Delivery</h2>
                        <p>We strive to process and ship orders promptly. However, delivery times may vary depending on your location and shipping method. We are not responsible for delays caused by shipping carriers, customs, or other unforeseen circumstances. It is your responsibility to provide an accurate and complete shipping address.</p>
                    </section>

                    <section>
                        <h2>5. Returns and Refunds</h2>
                        <p>We offer returns and refunds in accordance with our <a href="/return-policy">Return Policy</a>. Please review the policy for details on eligibility, timeframes, and procedures for returns or exchanges.</p>
                    </section>

                    <section>
                        <h2>6. Intellectual Property</h2>
                        <p>All content on this website, including but not limited to text, images, graphics, logos, and software, is the property of <strong>THE KOREAN STOP</strong> and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>
                    </section>

                    <section>
                        <h2>7. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law, <strong>THE KOREAN STOP</strong> shall not be liable for any direct, indirect, incidental, or consequential damages arising out of or related to your use of the website, products, or services. This includes, but is not limited to, loss of profits, data, or business opportunities.</p>
                    </section>

                    <section>
                        <h2>8. Third-Party Links</h2>
                        <p>Our website may include links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these third-party sites. Accessing such links is at your own risk.</p>
                    </section>

                    <section>
                        <h2>9. Termination</h2>
                        <p>We reserve the right to terminate or suspend your access to our website at any time, without prior notice, for any reason, including but not limited to a violation of these terms.</p>
                    </section>

                    <section>
                        <h2>10. Changes to the Terms and Conditions</h2>
                        <p>We reserve the right to update or modify these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting on this page. Your continued use of the website constitutes acceptance of the updated terms.</p>
                    </section>

                    <section>
                        <h2>11. Governing Law</h2>
                        <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Country/Region]. Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].</p>
                    </section>

                    <section>
                        <h2>12. Contact Us</h2>
                        <p>If you have any questions, concerns, or inquiries about these Terms and Conditions, please contact us at:</p>
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