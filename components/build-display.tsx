import Image from 'next/image';
import React from 'react';

// The build display displays all currently equipped items and their images in a grid that reflects the shape of a mech.
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

export default function BuildDisplay() {
  return (
    <div>
      <div>
        HEAD
        <div>
          {/* image of head part/placeholder image of wire frame head */}
        </div>
      </div>
      <div>
        CORE
        <div>
          {/* image of core part/placeholder image of wire frame core */}
        </div>
      </div>
    </div>
  );
}
