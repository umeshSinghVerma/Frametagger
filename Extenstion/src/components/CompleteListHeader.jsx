import Sidebar from "./Sidebar";
import CompleteListDocument from "./CompleteListDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

const CompleteListHeader = ({ activeTab, setActiveTab, completeData }) => {
  const PlayListTitle = completeData.PlayListTitle;
  const userData = completeData.userData;
  const playlistVideos = completeData.PlaylistVideos;
  const availableVideos = playlistVideos.filter((video) =>
    userData.hasOwnProperty(video)
  );
  return (
    <div className="bg-[#323639] flex items-center justify-between">
      <div className="flex  items-center">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isList={completeData.list}
        />
        <p
          style={{
            color: "#f1f1f1",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          className="mb-0.5 text-sm max-w-[280px]"
        >
          {PlayListTitle}
        </p>
      </div>
      <div>
        {availableVideos.length > 0 && (
          <PDFDownloadLink
            document={<CompleteListDocument completeData={completeData} />}
            fileName={`${PlayListTitle}.pdf`}
          >
            {({ loading }) =>
              !loading && (
                <button className="h-[32px] w-[32px] mr-2  rounded-full hover:bg-[#ffffff16] flex items-center justify-center">
                  <img src="/download.svg" alt="download" title="download" />
                </button>
              )
            }
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export default CompleteListHeader;
