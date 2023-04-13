import Navbar from "@/components/navbar";
import Toastify from "@/components/toastify/toastify.component";
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    return (
      <section>
        <Navbar></Navbar>
        {children}
        <Toastify />
      </section>
    );
  }