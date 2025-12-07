'use client';
import React, { useState, useEffect } from 'react';
import logo from '@/public/images/logo.png';
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { ImCancelCircle } from 'react-icons/im';
import Link from 'next/link';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menubar, setMenubar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const menuItems = [
    {
      title: 'Personal',
      links: ['Banking', 'Loans', 'Credit Cards', 'Investments']
    },
    {
      title: 'Small Business',
      links: ['Business Banking', 'Business Loans', 'Merchant Services']
    },
    {
      title: 'Commercial',
      links: ['Commercial Banking', 'Treasury Management', 'Commercial Lending']
    },
    {
      title: 'Institutional Investing',
      links: ['Wealth Management', 'Retirement Planning', 'Trust Services']
    },
    {
      title: 'About Us',
      links: ['Our Story', 'Leadership', 'Careers', 'Community Impact']
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenubar(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
const navItems = [{name:'Home', path: '/'},{name:'Contact us', path: '/home/contactUs'},
  { name:'Locations', path: '/home/location'}, 
{name:'Investor Relations', path: 'home/investor-relation'}, {name:'FAQs', path: '/home/faq'}]
  return (
    <header className='bg-white'>
      {!isMobile && (
        <>
          <nav className='flex cursor-pointer relative items-center max-w-7xl mx-auto'>
            <div><Link href='/'><Image src={logo} alt='logo' width={180} height={50} /></Link></div>
            <div className='mx-[5rem]'>
              <ul className='flex space-x-6'>
                {navItems.map((item, index) => (
                  <Link href={item.path} key={index} >
                  <li className='text-[#03305c] font-bold
                   hover:text-[#e8742c] text-sm 
                  '>{item.name}</li></Link>
                ))}
             
              </ul>
            </div>
            
            <div className='flex space-x-3 mr-5'>
              <Link href='/account/login'>
              <button className='rounded-3xl px-4 py-1 bg-white text-[#03305c] border
               border-[#03305c] hover:border-[#e8742c] hover:text-[#e8742c] transition-colors 
               text-sm font-bold'>
                Login
              </button>
              </Link>
                         <Link href='/account/signup'>

              <button className='rounded-2xl px-4 py-1 bg-[#03305c] hover:bg-[#e8742c]
               text-white transition-colors text-sm font-bold'>
                Open an Account
              </button>
                            </Link>

            </div>
          </nav>

</>
      )}

      {isMobile && (
        <nav className='flex justify-between items-center px-4 py-3'>
          <button onClick={() => setMenubar(!menubar)}>
            {menubar ? <ImCancelCircle className='text-2xl text-[#03305c]' /> : <GiHamburgerMenu className='text-2xl text-[#03305c]' />}
          </button>
          <Link href='/'><div><Image src={logo} alt='logo' width={120} height={40} /></div></Link>
        <Link href='/account/login'><button className='rounded-3xl px-3 py-1.5 bg-white text-[#03305c] border border-[#03305c] hover:border-[#e8742c] text-sm'>
            Login
          </button></Link>  
        </nav>
      )}

      {isMobile && menubar && (
        <div className='bg-white px-4 py-3 pt-[3rem] space-y-7'>
          <Link href={'/account/signup'}>
          <button className='w-[70%] rounded-3xl py-3 bg-white text-[#03305c] border border-[#03305c] hover:border-[#e8742c] font-medium mb-2'>
            Open an Account
          </button>
</Link>
          <ul className='space-y-2 pt-3'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className='w-full flex items-center justify-between font-bold text-lg hover:text-[#e8742c] text-[#03305c] py-2'
                  onClick={() => toggleDropdown(index)}
                >
                  <span>{item.title}</span>
                  {activeDropdown === index ? <FaAngleUp /> : <FaAngleDown />}
                </button>

                {activeDropdown === index && (
                  <ul className='pl-4 space-y-2 mt-2'>
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href="#"
                          className='block py-1.5 text-[#03305c] hover:text-[#e8742c] text-sm'
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className='pt-8'>
            <ul className='space-y-5'>
              {['Contact us', 'Locations', 'Investor Relations', 'FAQs'].map((item, index) => (
                <li key={index} className='text-[#03305c] hover:text-[#e8742c] text-lg font-bold py-1'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;
