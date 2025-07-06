import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

export function CodeHighlighter({ code }: { code: string }) {
  return (
    <Highlight theme={themes.shadesOfPurple} code={code} language="html">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
          className={className}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
