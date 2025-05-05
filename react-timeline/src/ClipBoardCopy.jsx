import React, {use, useState} from 'react';

export default function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);
    const [message, setMessage] = useState("");
  
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
        } else {
        return document.execCommand('copy', true, text);
        }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setMessage("Copied to clipboard");
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
            setTimeout(() => {
                setMessage("");
            }, 1000);
        });
    }
  
    return (
      <div>
        {/* <input onClick={handleCopyClick} type="text" value={copyText} readOnly /> */}
        {/* Bind our handler function to the onClick button property */}
        <button onClick={handleCopyClick} className={`cursor-pointer text-blue-800 hover:text-blue-600`}>
          <p>{copyText}</p>
        </button>
        <span>{isCopied ? "  ✅" : ""}</span>
        <br/>
        

      </div>
    );
  }