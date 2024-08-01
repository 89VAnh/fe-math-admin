declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

import "mathlive";
import { MathfieldElement } from "mathlive";
import { Dispatch, SetStateAction, useState } from "react";

function MathField({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className='w-full'>
      <math-field
        onInput={(event: React.MouseEvent<MathfieldElement>) => {
          // @ts-ignore
          setValue(event.target.value);
        }}>
        {value}
      </math-field>
    </div>
  );
}

export default MathField;
