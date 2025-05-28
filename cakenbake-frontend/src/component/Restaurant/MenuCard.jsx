import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

const MenuCard = ({ item }) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='items-center justify-between lg:flex lg:gap-5'>
                        <div className='items-center lg:flex'>
                            <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} alt="" />
                        </div>
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className='text-xl font-semibold'>{item.name}</p>
                            <p>{item.price} LKR</p>
                            <p className='text-gray-400'>{item.description}</p>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Future form for cart interaction */}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default MenuCard;
