/* global chrome */
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import StartingScreen from "./components/StartingScreen";
import MYDocument from "./components/MyDocument";
import CompleteListDocument from "./components/CompleteListDocument";
import Header from "./components/Header";
import CompleteListHeader from "./components/CompleteListHeader";
import { fetchVideosList } from "./hooks/fetchVideosList";

function App() {
  const [activeTab, setActiveTab] = useState("pdf");
  const [notYoutube, setNotYoutube] = useState(false);
  const [completeData, setCompleteData] = useState({
    list: null,
    videoId: null,
    userData: {},
    PlaylistVideos: [],
    PlayListTitle: null,
  });

  useEffect(() => {
    getVideoData();
  }, []);

  async function getVideoData() {

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (notYoutube) {
        setNotYoutube(false);
      }

      const pageUrl = tabs[0].url;

      if (pageUrl.includes("youtube.com/watch")) {
        const queryParameters = pageUrl.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        const videoId = urlParameters.get("v");
        const ListId = urlParameters.get("list");
        await chrome.storage.local.get("userData").then(async (result) => {

          console.log("this is the userData", result.userData);

          if (result.userData && videoId) {
            const userData = result.userData;
            if (ListId) {
              const data = await fetchVideosList(ListId);
              if (data) {
                setCompleteData({
                  list: ListId,
                  currentVideo: videoId,
                  userData: userData,
                  PlaylistVideos: data.videoIds,
                  PlayListTitle: data.playlistTitle,
                });
              }
            } else {
              setCompleteData({
                list: null,
                currentVideo: videoId,
                userData: userData,
                PlaylistVideos: [],
                PlayListTitle: "",
              });
            }
          }
        });
      } else {
        setActiveTab("Not Youtube");
      }
    });
  }

  switch (activeTab) {
    case "pdf":
      return (
        <div className="flex flex-col w-full bg-[#525659] h-screen">
          <div className="sticky top-0">
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isList={completeData.list}
              videoData={completeData.userData[completeData.currentVideo]}
            />
          </div>
          {completeData.userData[completeData.currentVideo] && (
            <PDFViewer showToolbar={false} height={"100%"} width={"100%"}>
              <MYDocument
                videoData={completeData.userData[completeData.currentVideo]}
              />
            </PDFViewer>
          )}
        </div>
      );
    case "list":
      return (
        <div className="flex flex-col w-full bg-[#525659] h-screen">
          <div className="sticky top-0">
            <CompleteListHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              completeData={completeData}
            />
          </div>
          <PDFViewer showToolbar={false} height={"100%"} width={"100%"}>
            <CompleteListDocument completeData={completeData} />
          </PDFViewer>
        </div>
      );

    default:
      return <StartingScreen notYoutube={true} />;
  }
}

export default App;
