import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function CreateObjectPage() {

  const content = getFileContentByPath("src/md/digital-accuracy.md")

  function strip(number, precision = 12) {
    return +parseFloat(number.toPrecision(precision));
  }

  console.log(strip(0.1 + 0.2));
  

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default CreateObjectPage;