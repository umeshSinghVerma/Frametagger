import React from 'react'

const EmbedPdf = ({ pdf }) => {
    return (
        <embed className="w-[1500px] h-[400px] hidden md:block" src={`${pdf}#toolbar=1`} type="application/pdf" />
    )
}

export default EmbedPdf
