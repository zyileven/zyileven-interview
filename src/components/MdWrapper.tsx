import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 支持表格、删除线等扩展语法
import rehypeHighlight from 'rehype-highlight'; // 代码高亮
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ShadowView from './ShadowView';

function MdWrapper({ content }: {
  content?: string;
}) {

  const parseChild = (childs: any[]) : string => {
    if (typeof childs === "string") {return childs}
    return childs?.map((child) => {
      if (React.isValidElement(child)) {
        // @ts-expect-error 不管他
        const childText = child.props?.children;

        if (React.isValidElement(childText)) {
          // @ts-expect-error 不管他
          return parseChild(childText.props.children)
        } else if (Array.isArray(childText)) {
          return parseChild(childText);
        } else {
          return typeof childText === 'string' ? childText : '';
        }
      } else if (typeof child === 'string') {
        return child;
      } else {
        return '';
      }
    }).join('')
  }


  return (
    <ShadowView>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          blockquote({ children }) {
            return (
              <blockquote style={{
                borderLeft: '4px solid #ccc',
                margin: 6,
                padding: 6,
                paddingLeft: 16,
                color: '#666',
                background: '#f9f9f9',
              }}>
                {children}
              </blockquote>
            );
          },
          // 图片处理组件：确保最大宽度不超过容器100%
          img: ({ src, alt, title, ...props }) => (
            <img 
              src={src as string} 
              alt={alt || ''}
              title={title}
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                display: 'block',
                margin: '10px auto',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              {...props}
            />
          ),
          code({ node, className, children, ...props }) {
            if (!node) return null;
            const isCodeBlock = className?.includes("language-");
            const language = isCodeBlock ? className?.split(" ")[1]?.replace("language-", "") : "text";
            
            // 处理 children
            const codeText = Array.isArray(children)
              ? parseChild(children)
              : children;
            return isCodeBlock ? (
              <SyntaxHighlighter
                style={atomDark}
                language={language}
                customStyle={{
                  maxWidth: "100%"
                }}
                PreTag="div"
              >
                {codeText as string}
              </SyntaxHighlighter>
            ) : (
              <code style={{ maxWidth: "100%", background: "#e8e8e8", padding: "2px 4px" }} className={className} {...props}>
                {codeText as string}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </ShadowView>
  );
}

export default MdWrapper;