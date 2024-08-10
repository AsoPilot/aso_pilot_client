import { ChevronLeft } from 'lucide-react';

function AboutOrganisation() {
    return (
        <>
        <section className="w-96 h-full">
                    <header className="mb-20">
                        <img src="./images/logo.png" alt="" className="mx-auto" />
                    </header>

                    <div className="mb-md">
                        <p className="h3">About organization</p>
                        <p className="text-slate-400">Setup your organization for members that may join later.</p>
                    </div>

                    <div className="mb-md">
                        <label htmlFor="" className="block mb-xs">Full Name</label>
                        <div>
                            <input type="text" className="form-input" />
                        </div>
                    </div>

                    <div className="mb-md">
                        <label htmlFor="" className="block mb-xs">Company Name</label>
                        <div>
                            <input type="password" className="form-input" />
                        </div>
                    </div>
                    
                    <div className="mb-md">
                        <label htmlFor="" className="block mb-xs">Job function</label>
                        <div>
                            <select name="" id="" className="form-select">
                                <option value="">select</option>
                            </select>
                        </div>
                    </div>
                    <div className='mb-md'>
                        <button className="btn-primary is-lg">Save & Proceed</button>
                    </div>
                    <div className='mb-md'>
                        <button className="is-lg text-blue-500 mx-auto">
                            <ChevronLeft size={16} />
                            Back</button>
                    </div>
                    
                </section></>
    )
}
export default AboutOrganisation;