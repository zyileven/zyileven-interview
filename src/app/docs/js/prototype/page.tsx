import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function CreateObjectPage() {

  const content = getFileContentByPath("src/md/原型链与继承.md")

  const obj = new Object();
  console.log(obj.__proto__);
  console.log(Object.getPrototypeOf(obj))

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default CreateObjectPage;