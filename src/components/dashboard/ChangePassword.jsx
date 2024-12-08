import React from 'react'

const ChangePassword = () => {
  return (
    <div>
      <div className="bg-white p-4 rounded-md">
        <div className="border-b pb-2 ">
          <h2 className="text-xl text-[#34548d] font-semibold uppercase">Change Password</h2>
        </div>
        <div className="py-2">
          <form className="">
            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="old_password" className="font-semibold">
                Old Password
              </label>
              <input
                type="password"
                name="old_password"
                id="old_password"
                className="px-3 py-1 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                placeholder="Old Password"
              />
            </div>
            {/*  */}
            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="new_password" className="font-semibold">
                New Password
              </label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                className="px-3 py-1 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                placeholder="New Password"
              />
            </div>
            {/*  */}
            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="confirm_password" className="font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="px-3 py-1 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                placeholder="Confirm Password"
              />
            </div>
            {/*  */}
            <div>
              <button className="px-8 py-2 font-semibold rounded-md shadow-md my-2 bg-[#34548d] hover:bg-blue-800 text-white hover:shadow-indigo-200">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
