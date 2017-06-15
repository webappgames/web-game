import * as React from "react";
import Heading from './heading.tsx';

export default function Root() {
    return (
        <div>
            <nav className="top">
                <div className="left">
                    <Heading/>
                </div>
                <ul>
                    <li>Menu 1</li>
                    <li>Menu 2</li>
                    <li>Menu 3</li>
                </ul>
                <div className="right">

                    <button>Uložit</button>

                </div>
            </nav>

            <nav className="left">

            </nav>


            <footer>


            </footer>


        </div>
    )
}