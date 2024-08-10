import { ChevronLeft } from 'lucide-react';

function ChooseModalApp() {
return (
<>
    <section className="w-96 h-full">
        <header className="mb-20">
            <img src="./images/logo.png" alt="" className="mx-auto" />
        </header>

        <div className="mb-md">
            <p className="h3">Choose modal app</p>
            <p className="text-slate-400">Add an app to discover user feedback and market intelligence.</p>
        </div>

        <div className="mb-md">
            <label htmlFor="" className="block mb-xs">Select Your Country</label>
            <div>
                <select name="" id="" className="form-select">
                    <option value="">select</option>
                </select>
            </div>
        </div>
        <div className='grid grid-cols-3 gap-base mb-md'>
            <div className='col-span-2 h-48 flex flex-col overflow-auto'>
                <h6 className='mb-1'>Do you have an app?</h6>
                <div className='shadow-sm border border-slate-300 p-xs rounded-md'>
                    <header>
                        <input type="text" className='form-input' />
                    </header>
                    <section className='mt-sm flex-1 overflow-auto'>
                        <div className='flex gap-sm items-center border-b border-slate-300 py-1'>
                            <img src="./images/app1.png" alt="" />
                            <aside className='flex-1 truncate'>
                                <p className='text-xs'>CarWale: Buy & Sell New/Usedcars</p>
                                <span className='text-xs'>4.3</span>
                            </aside>
                        </div>
                    </section>
                </div>
            </div>
            <div className='col-span-1 h-48 flex flex-col overflow-auto'>
                <h6 className='mb-1'>Dont have?</h6>
                <div className='shadow-sm border border-slate-300 p-xs rounded-md'>
                    <header className='text-xs text-slate-400 mb-sm'>
                        Add a popular app to see how it works?
                    </header>
                    <div className='grid grid-cols-2 gap-sm'>
                        <button className='p-0'>
                            <img src="./images/insta.png" alt="" />
                        </button>
                        <button className='p-0'>
                            <img src="./images/facebook.png" alt="" />
                        </button>
                        <button className='p-0'>
                            <img src="./images/amazon.png" alt="" />
                        </button>
                        <button className='p-0'>
                            <img src="./images/flipkart.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className='mb-md'>
            <button className="btn-primary is-lg">Save & Proceed</button>
        </div>
        <p className='mb-md text-xs text-slate-400 text-center'>
        You also can add apps, games or products from Amazon, Mac App Store, Apple Arcade, Discord, App Gallery and Microsoft Store later.
        </p>
        <div className='mb-md'>
            <button className="is-lg text-blue-500 mx-auto">
                <ChevronLeft size={16} />
                Back
            </button>
        </div>

    </section>
</>
)
}
export default ChooseModalApp;