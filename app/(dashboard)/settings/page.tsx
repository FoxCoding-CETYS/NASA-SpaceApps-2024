import React from "react";
import { Input } from "@nextui-org/input";

interface user {
    name: string,
    email: string,
    password: string,
    zipcode: number
}

export default function Settings() {

    const newUser: user = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "securePassword123",
        zipcode: 12345
    };

    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen w-full">
                {/* Main Content */}
                <div className="z-10 flex-1 p-8 sm:p-20 bg-[#f0f4f8] flex flex-col items-center text-center text-gray-800">
                    <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-semibold mb-6">Settings</h1>
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">Name</label>
                                <Input className="w-full sm:w-2/3" placeholder={newUser.name} />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center">
                                <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">Email</label>
                                <Input className="w-full sm:w-2/3" placeholder={newUser.email} />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center">
                                <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">Password</label>
                                <Input className="w-full sm:w-2/3" type="password" placeholder='password' />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center">
                                <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">Zip Code</label>
                                <Input className="w-full sm:w-2/3" placeholder={newUser.zipcode.toString()} />
                            </div>
                        </div>
                        <button className="mt-8 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">Save Changes</button>
                    </div>
                </div>
            </div>
        </>
    )
}