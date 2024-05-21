import { useState } from "react";
import Child from "./Child";
import styled, { css } from "styled-components";

type DemoComponentProps = {
    name: string;
    age?: number;
    sum: () => void; //func
    sum1?: () => void;
    total(a: number, b: number): void;
};

const DemoComponent = (props: DemoComponentProps) => {
    const { name, age, total } = props;
    const [number, setNumber] = useState<number>();
    return (
        <>
            <div>DemoComponent</div>
            {/* <button
                className="py-2 px-20 border border-red-500 rounded-10 hover:bg-green-500 hover:text-yellow-200 transition-all ease-linear duration-300"
                onClick={() => total(10, 20)}
            >
                Call Total
            </button> */}
            <Button onClick={() => total(10, 20)} bgColor="#ccc" disabled>
                Call Total
            </Button>

            <button
                className="py-2 px-20 border border-red-500 rounded-10 hover:bg-green-500 hover:text-yellow-200 transition-all ease-linear duration-300"
                onClick={() => setNumber(20)}
            >
                + Number
            </button>
            <Child />
        </>
    );
};

// ------------ styled --------------
const Button = styled.button<{ bgColor?: string; disabled?: boolean }>`
    margin-left: 10px;
    padding: 10px 20px;
    border: 1px solid red;
    border-radius: 10px;
    background: ${(props) => props.bgColor};
    
    ${(props) => {
        if (props.disabled) {
            return css`
                background: grey !important;
                pointer-events: none;
            `;
        }
    }}

    &:hover {
        background: cyan;
        color: #fff;
    }
`;

export default DemoComponent;
