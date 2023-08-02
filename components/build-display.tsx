import Image from 'next/image';
import React from 'react';

// The build display displays all currently equipped items and their images in a grid that reflects the shape of a mech.
interface Part {
  name: string;
  image: string;
  recommended: string;
  function: string;
  price: number;
  power: number;
  ammo: number;
}
/* 
              .--------------.-----------------------------.-------.----------.
              | RECOMMENDED  | FUNCTION                    | PRICE | POWR/AMM |
.-------------+--------------+-----------------------------+-------+----------|
| HEAD        | HD-GRY-NX    | Has no optional equipment   | 14700 | -------- |
| CORE        | XCA-00       | Standard core unit          | 61500 | -------- |
| ARMS        | AN-201       | Low energy consumption...   | 15300 | -------- |
| LEGS        | LN-1001-PX-0 | Balanced, all-terrain legs  | 25000 | -------- |
| GENERATOR   | GPS-VVA      | 4728 Output/28000 MaxCharge | 19500 | -------- |
| FCS         | COMDEX-C7    | Maximum of 4 lock-ons       | 11000 | -------- |
| BOOSTER     | B-P320       | Low-priced and underpowered | 10800 | -------- |
| B. WEAPON L | WM-S40/1     | Fires single missiles       | 18700 |   830/40 |
| B. WEAPON R | RXA-01WE     | Old-style radar antenna     | 12100 | -------- |
| A. WEAPON L | LS-2001      | Standard portable rifle     | 11400 |  218/200 |
| A. WEAPON R | WG-RF35      | Infinite-use laserblade     | 11500 |  738/--- |
'-------------'--------------'-----------------------------'-------'----------'
*/

interface BuildDisplayProps {
  parts: Part[];
}

export default function BuildDisplay({ parts }: BuildDisplayProps) {
  return (
    // <div className="grid grid-cols-4 gap-4 p-4">
    //   <div className="col-span-4">
    //     <h2 className="text-xl font-bold">Mech Build</h2>
    //   </div>
    //   {parts.map((part, index) => (
    //     <div key={index} className="flex flex-col items-center space-y-2">
    //       <h3 className="font-semibold">{part.name}</h3>
    //       <div className="w-16 h-16 bg-gray-200 rounded">
    //         <Image src={part.image} alt={part.name} width={64} height={64} />
    //       </div>
    //       <div className="flex flex-col space-y-1">
    //         <div>
    //           RECOMMENDED:{' '}
    //           <span className="font-semibold">{part.recommended}</span>
    //         </div>
    //         <div>
    //           FUNCTION: <span className="font-semibold">{part.function}</span>
    //         </div>
    //         <div>
    //           PRICE: <span className="font-semibold">{part.price}</span>
    //         </div>
    //         <div>
    //           POWR/AMM:{' '}
    //           <span className="font-semibold">
    //             {part.power}/{part.ammo}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <></>
  );
}
