import React from "react";
import Link from "next/link";

const Thing: React.FC<{ msg: string }> = (props) => {
  return <div>{props.msg}</div>;
};

export default () => (
  <div>
    Hello World. <Thing msg="hello" />
    <Link href="/sign-up">
      <a>Sign Up</a>
    </Link>
  </div>
);
