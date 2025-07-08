import CodeSyntax from "@/components/CodeSyntax";
export default function Home() {

  const codeString = `margin-top: 20px;`
  const shellString = `npm install`;

  return (
    <div>
      123
      <div className="px-4">
        <CodeSyntax code={codeString} language={"css"} />
      </div>
      <CodeSyntax code={shellString} language={"shell"} />
    </div>
  );
}
