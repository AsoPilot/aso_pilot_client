import ReviewsFeed from './components/dashboard/ReviewsFeed';
import { Icon, IconButton, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react'
import { MdEmail, MdQuestionAnswer, MdCalendarMonth, MdFolder, MdPublic, MdAdd, MdDashboard, MdMonitorHeart, MdDiamond, MdGpsFixed } from 'react-icons/md'

function MainLayout() {

    const navmenuhide = () => {
        document.getElementById('menu-overlay').style.display = 'none';
        document.getElementById('dashboard-sidebar').style.left = '-280px';
    }

    return (
        <>
            <main className="main-layout">
                <div id="menu-overlay" onClick={navmenuhide}></div>
                <aside className="border-r border-slate-300 min-w-[280px] max-w-[280px]" id="dashboard-sidebar">
                    <img src="./images/close.png" alt="" id="menu-close" onClick={navmenuhide} />
                    <header className="p-base h-16 border-b border-slate-200">
                        <img src="./images/logo.png" alt="" />
                    </header>
                    <nav className='flex flex-col p-base gap-1'>
                        <button className="flex gap-xs items-center justify-start px-base hover:bg-blue-200">
                            <Icon as={MdDashboard} boxSize={5} />
                            <span>Dashboard</span>
                        </button>

                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem border="none">
                                <AccordionButton gap={2} _expanded={{ bg: 'blue.500', color: 'white' }}>
                                    <Icon as={MdMonitorHeart} boxSize={5} />
                                    <Box as='span' flex='1' textAlign='left' className="text-sm">Monitor</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Accordion allowToggle>
                                        <AccordionItem border="none">
                                            <AccordionButton>
                                                <Box as='span' flex='1' textAlign='left' className="text-sm">Ratings & Reviews</Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        <AccordionPanel px={6}>
                                            <div className="flex flex-col gap-2">
                                                <button className="px-sm h-6 w-full justify-start hover:bg-lime-200">Rating chart</button>
                                                <button className="px-sm h-6 w-full justify-start hover:bg-lime-200">Reviews chart</button>
                                                <button className="px-sm h-6 w-full justify-start hover:bg-lime-200">Reviews analysis</button>
                                                <button className="px-sm h-6 w-full justify-start hover:bg-lime-200 bg-lime-400">Reviews feed</button>
                                            </div>
                                        </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem border="none">
                                <AccordionButton gap={2}>
                                    <Icon as={MdDiamond} boxSize={5} />
                                    <Box as='span' flex='1' textAlign='left' className="text-sm">Engage</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem border="none">
                                <AccordionButton gap={2}>
                                    <Icon as={MdGpsFixed} boxSize={5} />
                                    <Box as='span' flex='1' textAlign='left' className="text-sm">Accelerate</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </nav>
                </aside>
                <section className="">
                    <ReviewsFeed></ReviewsFeed>
                </section>
                <aside className="!hidden lg:!flex flex-col gap-sm border-l border-slate-200">
                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdEmail} />} />
                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdQuestionAnswer} />} />
                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdCalendarMonth} />} />
                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdFolder} />} />
                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdPublic} />} />
                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdAdd} />} />
                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdEmail} />} />
                </aside>
            </main>
        </>
    )
}
export default MainLayout;