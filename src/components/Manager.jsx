import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setform] = useState({ website: "", username: "", password: "" });
  const [forms, setforms] = useState([]);
  
  const getpass = async () => {
    let res = await fetch("http://localhost:3000/")
    let pass = await res.json()
    setforms(pass);
  }

  useEffect(() => {
    getpass();
  }, []);

  const copytext = (text) => {
    toast('Copied To Clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  }

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handledelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?")) return;
    toast('Password Deleted', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    await fetch("http://localhost:3000/", {method : "DELETE", headers : {"Content-Type" : "application/json"}, body: JSON.stringify({id})})
    setforms(forms.filter(item => item.id !== id));
  }

  const savepass = async () => {
    if (!form.website.trim() || !form.username.trim() || !form.password.trim()) {
      alert("Please fill in all fields before saving.");
      return;
    }
    toast('Password Saved', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    await fetch("http://localhost:3000/", {method : "DELETE", headers : {"Content-Type" : "application/json"}, body: JSON.stringify({id: form.id})})

    const updatedForms = [...forms, { ...form, id: uuidv4() }];
    setforms(updatedForms);
    await fetch("http://localhost:3000/", {method : "POST", headers : {"Content-Type" : "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })})
    setform({ website: "", username: "", password: "" });
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const handleEdit = (id)=>{
    setform({...forms.filter((item) => item.id === id)[0], id:id});
    setforms(forms.filter((item) => item.id !== id));
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />

      <div className="min-w-[500px] min-h-[1100px] fixed top-0 left-0 w-full -z-10 px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="mx-auto bg-blue-400 max-w-4xl min-w-[500px] my-5 px-20 py-5">
        <h1 className="font-bold text-green-800 text-3xl text-center">&lt;PassOP/&gt;</h1>
        <p className="font-bold text-red-600 text-2xl text-center">Your Password Manager</p>

        <div className="flex flex-col p-4 gap-5 items-center">
          <input onChange={(e) => handlechange(e)} value={form.website} name='website' placeholder="Enter URL" className="bg-white rounded-xl border border-s-green-900 text-black w-full px-3 py-1 outline-none" type="text" />

          <div className="flex gap-10 w-full justify-between">
            <input onChange={(e) => handlechange(e)} value={form.username} name='username' placeholder="Enter Username" className="bg-white rounded-xl border border-s-green-900 text-black w-full px-3 py-1 outline-none" type="text" />

            <div className="relative flex items-center ">
              <input onChange={(e) => handlechange(e)} name='password' value={form.password}
                placeholder="Enter Password"
                className="bg-white rounded-xl border border-s-green-900 text-black w-full px-2 py-1 pr-10 outline-none"
                type={isVisible ? "text" : "password"}
              />
              <img
                src={isVisible ? "/eye.svg" : "/openeye.svg"}
                alt="Toggle Visibility"
                onClick={handleClick}
                className="absolute right-2 cursor-pointer w-6 h-6"
              />
            </div>
          </div>

          <button className="group border flex justify-center items-center w-fit px-4 py-2 gap-2 bg-green-600 cursor-pointer hover:bg-green-700 font-bold rounded-full" onClick={() => savepass()}>
            <lord-icon
              id="password-icon"
              src="https://cdn.lordicon.com/tsrgicte.json"
              trigger="loop-on-hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
            ></lord-icon>
            SAVE
          </button>
        </div>
        <div className="mypass">
          <h2 className='text-2xl font-bold text-center py-6 italic'>Your Passwords</h2>
          {forms.length === 0 && <div className='underline text-center font-bold text-2xl'>No Passwords To Show</div>}
          {forms.length !== 0 &&
            <table className="table-auto w-full bg-pink-300">
              <thead className='text-white bg-green-700'>
                <tr>
                  <th className='py-2'>Website</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((item, index) => (
                  <tr key={index}>
                    <td className='text-center w-32 py-2'><a href={`https://${item.website}`} target='_blank'>
                      <span className='flex justify-center items-center '>{item.website}</span></a>
                    </td>
                    <td className='text-center w-32 py-2'>
                      <span className='flex justify-center items-center gap-1'>{item.username}
                        <lord-icon onClick={() => { copytext(item.username) }} className='cursor-pointer w-6'
                          src="https://cdn.lordicon.com/fjvfsqea.json"
                          trigger="click"
                          stroke="bold"
                          colors="primary:#121331,secondary:#000000">
                        </lord-icon>
                        <lord-icon onClick={() => handleEdit(item.id)}className="cursor-pointer"
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="loop-on-hover"
                          stroke="bold"
                          state="hover-line"
                          colors="primary:#121331,secondary:#000000">
                        </lord-icon>
                      </span>
                    </td>
                    <td className='text-center w-32 py-2'>
                      <span className='flex justify-center items-center gap-1'>{"*".repeat(item.password.length)}
                        <lord-icon onClick={() => { copytext(item.password) }} className='cursor-pointer w-6'
                          src="https://cdn.lordicon.com/fjvfsqea.json"
                          trigger="click"
                          stroke="bold"
                          colors="primary:#121331,secondary:#000000">
                        </lord-icon>
                        <lord-icon onClick={() => {handledelete(item.id)}} className="cursor-pointer"
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="loop-on-hover"
                          stroke="bold"
                          colors="primary:#121331,secondary:#000000">
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
};
export default Manager;
