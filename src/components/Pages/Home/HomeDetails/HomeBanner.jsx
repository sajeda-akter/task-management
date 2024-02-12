import { Banner } from "flowbite-react";

const HomeBanner = () => {
    return (
        <Banner>
        <div className="bg-gradient-to-r from-[#474F7A] text-[#FFB0B0] to-[#0C2D57] flex w-full justify-around items-center lg:flex-row flex-col-reverse min-h-screen">
        
       <div className="lg:ml-12 p-4">
        <h1 className="lg:text-5xl font-medium text-3xl">Task Management</h1>
      <p className="text-slate-300 mt-4">Task management is the process of overseeing a task through its lifecycle. It involves planning, testing, tracking, and reporting. Task management can help individuals achieve goals or enable groups of individuals to collaborate and share knowledge for the accomplishment of collective goals.[1] Tasks are also differentiated by complexity, from low to high.</p>
</div>
        
        <img src="/src/assets/banner2.png " className="lg:w-2/4" alt="" />

        </div>
      </Banner>
    );
};

export default HomeBanner;