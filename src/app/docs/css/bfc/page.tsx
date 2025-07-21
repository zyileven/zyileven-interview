import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function CSSUnitPage() {

  const content = getFileContentByPath("src/md/css/BFC.md")

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default CSSUnitPage;