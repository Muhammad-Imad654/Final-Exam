import { SiMeta } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState({ message: '', isError: false });
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async () => {
        if (!email || !email.includes('@')) {
            setSubscriptionStatus({ message: 'Please enter a valid email address', isError: true });
            return;
        }

        setIsSubscribing(true);
        setSubscriptionStatus({ message: '', isError: false });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, 
                { email }
            );
            setSubscriptionStatus({ message: 'Thank you for subscribing!', isError: false });
            setEmail('');
        } catch (error) {
            console.error('Subscription error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again.';
            setSubscriptionStatus({ message: errorMessage, isError: true });
        } finally {
            setIsSubscribing(false);
        }
    };

    return (
        <footer className="text-gray-700 bg-white border-t">
            {/* Top Section */}
            <div className="container flex flex-col items-center justify-between gap-6 py-6 mx-auto text-center md:flex-row md:text-left">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl">🔒</span>
                    <h4 className="font-semibold">FREE INTERNATIONAL SHIPPING</h4>
                    <p className="text-sm">On all orders over $100.00</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl">🔄</span>
                    <h4 className="font-semibold">45 DAYS RETURN</h4>
                    <p className="text-sm">Money back guarantee</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl">✅</span>
                    <h4 className="font-semibold">SECURE CHECKOUT</h4>
                    <p className="text-sm">100% secured checkout process</p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container grid grid-cols-1 gap-6 py-10 mx-auto border-t md:grid-cols-4">
                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold">Newsletter</h3>
                    <p className="mt-2 text-sm">Be the first to hear about new products, exclusive events, and online offers.</p>
                    <p className="mt-1 text-sm">Sign up and get 10% off your first order.</p>
                    <div className="flex flex-col mt-3">
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 p-2 border" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button 
                                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                                onClick={handleSubscribe}
                                disabled={isSubscribing}
                            >
                                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                        {subscriptionStatus.message && (
                            <p className={`mt-2 text-sm ${subscriptionStatus.isError ? 'text-red-600' : 'text-green-600'}`}>
                                {subscriptionStatus.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Shop Links */}
                <div>
                    <h3 className="text-lg font-semibold">Shop</h3>
                    <ul className="mt-2 space-y-1">
                        <li><Link to="/collection/all/?gender=Men&category=Top wear" className="hover:text-indigo-600 transition-colors">Men's Top Wear</Link></li>
                        <li><Link to="/collection/all/?gender=Women&category=Top wear" className="hover:text-indigo-600 transition-colors">Women's Top Wear</Link></li>
                        <li><Link to="/collection/all/?gender=Men&category=Bottom wear" className="hover:text-indigo-600 transition-colors">Men's Bottom Wear</Link></li>
                        <li><Link to="/collection/all/?gender=Women&category=Bottom wear" className="hover:text-indigo-600 transition-colors">Women's Bottom Wear</Link></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h3 className="text-lg font-semibold">Support</h3>
                    <ul className="mt-2 space-y-1">
                        <li><Link to="#" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
                        <li><Link to="#" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                        <li><Link to="#" className="hover:text-indigo-600 transition-colors">FAQs</Link></li>
                        <li><Link to="#" className="hover:text-indigo-600 transition-colors">Features</Link></li>
                    </ul>
                </div>

                {/* Follow Us */}
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex items-center mt-2 space-x-4">
                        <a href="#" className='hover:text-indigo-600 transition-colors'>
                            <SiMeta className='h-7 w-7' />
                        </a>
                        <a href="#" className='hover:text-indigo-600 transition-colors'>
                            <FaInstagram className='h-7 w-7' />
                        </a>
                        <a href="#" className='hover:text-indigo-600 transition-colors'>
                            <RiTwitterXFill className='h-7 w-7' />
                        </a>
                    </div>
                    <p className="mt-4 font-semibold">Call Us</p>
                    <p className="text-lg font-bold">📞 0123-456-789</p>
                </div>
            </div>

            {/* Copyright */}
            <div className="py-4 text-sm text-center border-t">
                © 2025, Wearly. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
