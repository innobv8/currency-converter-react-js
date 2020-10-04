import React from "react";
import {Link} from "react-router-dom";

export default function NavBar() {
    const appTitle = React.useState('Currency Converter');

    function title() {
        return (
            <Link to="/"
                  className="text-md font-bold leading-relaxed inline-block mr-42 py-2 whitespace-no-wrap uppercase text-white">
                {appTitle}
            </Link>
        )
    }

    return (
        <nav
            className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-500 mb-3 p-2 mt-0 sticky w-full z-10 top-0">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between ">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    {title()}
                </div>
            </div>
        </nav>
    );
}