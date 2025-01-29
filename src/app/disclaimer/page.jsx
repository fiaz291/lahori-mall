'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Disclaimer() {
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
                    <h1 className='text-center text-[42px]'>Disclaimer</h1>
                    <section>
                        <p>Welcome to <strong>THE KOREAN STOP</strong> (referred to as "we," "our," or "us"). By accessing or using our website, you agree to the terms outlined in this disclaimer. If you do not agree, please refrain from using our website.</p>
                    </section>

                    <section>
                        <h2>General Information</h2>
                        <p>The content provided on <strong>THE KOREAN STOP</strong> is for general informational and shopping purposes only. While we strive to ensure the accuracy and timeliness of the information displayed on our site, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of products, services, or related graphics on the website.</p>
                    </section>

                    <section>
                        <h2>Product Information</h2>
                        <p>All products sold on <strong>THE KOREAN STOP</strong> are subject to availability and may vary in appearance, price, or description without prior notice. We strive to provide accurate product descriptions, but we do not guarantee that the information provided is error-free. Customers are encouraged to verify product details before making a purchase.</p>
                    </section>

                    <section>
                        <h2>Third-Party Links</h2>
                        <p>Our website may contain links to third-party websites or services that are not owned or controlled by <strong>THE KOREAN STOP</strong>. We do not endorse or assume responsibility for the content, products, or services provided by these third-party sites. Accessing such links is at your own risk.</p>
                    </section>

                    <section>
                        <h2>Health and Safety Disclaimer</h2>
                        <p>Some products sold on <strong>THE KOREAN STOP</strong> may include food, skincare, or cosmetic items. We recommend that customers carefully read product labels, ingredient lists, and warnings provided by the manufacturers. If you have any allergies, medical conditions, or concerns, please consult with a qualified healthcare professional before using or consuming these products. We are not liable for any adverse reactions or health-related issues caused by our products.</p>
                    </section>

                    <section>
                        <h2>Limitation of Liability</h2>
                        <p>In no event shall <strong>THE KOREAN STOP</strong> be held liable for any loss or damage, including but not limited to indirect, incidental, or consequential damages, arising out of or in connection with the use of our website, products, or services. This limitation applies even if we have been advised of the possibility of such damages.</p>
                    </section>

                    <section>
                        <h2>Changes to This Disclaimer</h2>
                        <p>We reserve the right to update, modify, or remove portions of this disclaimer at any time without prior notice. It is your responsibility to review this page periodically to stay informed of any changes.</p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>If you have any questions or concerns about this disclaimer, please feel free to contact us at:</p>
                        <p><strong>Email:</strong> support@thekoreanstop.com</p>
                        <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}