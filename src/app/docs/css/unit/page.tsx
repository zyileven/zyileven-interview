import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function CSSUnitPage() {

  const content = getFileContentByPath("src/md/css/页面尺寸单位.md")

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default CSSUnitPage;