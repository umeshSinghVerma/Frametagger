import Sidebar from "./Sidebar";
import MYDocument from "./MyDocument";
import { PDFDownloadLink } from '@react-pdf/renderer';

const Header = ({ activeTab, setActiveTab, videoData, isList }) => {
    const title = videoData?.heading||"Frametagger";
    return (
      <div className='bg-[#323639] flex items-center justify-between'>
        <div className='flex  items-center'>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isList={isList} />
          <p style={{ color: "#f1f1f1", textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap' }} className='mb-0.5 text-sm max-w-[280px]'>{title}</p>
        </div>

        <div>
          {videoData && <PDFDownloadLink document={<MYDocument videoData={videoData} />} fileName={`${title}.pdf`}>
            {({ loading }) => (!loading &&
              <button className='h-[32px] w-[32px] mr-2  rounded-full hover:bg-[#ffffff16] flex items-center justify-center'>
                <img src="/download.svg" alt="download" title='download' />
              </button>)
            }
          </PDFDownloadLink>}
        </div>
      </div>
    )
}

export default Header;