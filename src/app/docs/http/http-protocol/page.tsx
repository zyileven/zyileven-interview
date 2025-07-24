import MdWrapper from '@/components/MdWrapper';
import { getFileContentByPath } from '@/lib/server-utils';

async function HttpBasePage() {

  const content = getFileContentByPath("src/md/http/HTTP协议.md")

  return (
    <div>
      <MdWrapper content={content} />
    </div>
  );
}

export default HttpBasePage;