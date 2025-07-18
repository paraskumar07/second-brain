// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="w-full px-6 py-4 border-t bg-white dark:bg-gray-900 text-center text-sm text-gray-500 dark:text-gray-400">
      © {new Date().getFullYear()} My Website. All rights reserved.
    </footer>
  );
};

export default Footer;
