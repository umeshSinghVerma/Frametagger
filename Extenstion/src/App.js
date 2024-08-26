/* global chrome */
import logo from './logo.svg';
import './App.css';
import { Page, Text, View, Document, StyleSheet, Image, Link, PDFViewer, Font, Line, PDFDownloadLink, } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Oswald from './fonts/Oswald.ttf'
import axios from 'axios';
import StartingScreen from './StartingScreen';

Font.register({
  family: 'Oswald',
  src: Oswald
});
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 50,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 38,
    left: 35,
    textAlign: 'left',
    color: 'grey',
  },
  branding: {
    position: "absolute",
    width: "200px",
    fontSize: 12,
    bottom: 30,
    right: 35,
    textAlign: 'right',
    color: 'grey',
  }
});
function MYDocument({ videoData }) {
  if (videoData) {
    return (
      <Document>
        <Page size="LEGAL" style={styles.body}>
          <View>
            <Text style={styles.title}>{videoData.heading}</Text>
            <Line />
            {
              videoData.data.map((video) => {
                return (
                  <>
                    <Link target="_blank" href={video.ytLink}>
                      <Image src={video.imgUrl} style={styles.image} />
                    </Link>
                    <Text style={styles.text}>{video.imgText}</Text>
                  </>
                )
              })
            }
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
          <View style={styles.branding} fixed>
            <Image
              style={{ height: "20px", bottom: "3px", right: "0px", position: "absolute" }}
              src="/logo192.png"
            />
            <Link target="_blank" href="https://Youtube-Notes.com" style={{ height: "20px", bottom: "0", right: "30px", position: "absolute" }}>Created Using Youtube-Notes</Link>
          </View>
        </Page>
      </Document>
    )
  } else {
    return null
  }
}
function CompleteListDocument({ completeData }) {
  const userData = completeData.userData;
  const playlistVideos = completeData.PlaylistVideos;
  const availableVideos = playlistVideos.filter((video) => userData.hasOwnProperty(video))
  if(availableVideos){
  return (
    <Document>
      {availableVideos.map((videoId) => {
        const title = userData[videoId].heading;
        const ImagesData = userData[videoId].data;
        return (
          <Page size="LEGAL" style={styles.body}>
            <View>
              <Text style={styles.title}>{title}</Text>
              {
                ImagesData.map((image) => {
                  return (
                    <>
                      <Link target="_blank" href={image.ytLink}>
                        <Image src={image.imgUrl} style={styles.image} />
                      </Link>
                      <Text style={styles.text}>{image.imgText}</Text>
                    </>
                  )
                })
              }
            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
            <View style={styles.branding} fixed>
              <Image
                style={{ height: "20px", bottom: "3px", right: "0px", position: "absolute" }}
                src="/logo192.png"
              />
              <Link target="_blank" href="https://Youtube-Notes.com" style={{ height: "20px", bottom: "0", right: "30px", position: "absolute" }}>Created Using Youtube-Notes</Link>
            </View>
          </Page>
        )
      })}
    </Document>)
  }else{
    return null;
  }
}
const Header = ({ activeTab, setActiveTab, videoData, isList }) => {
    const title = videoData?.heading||"Youtube-Notes";
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
const CompleteListHeader = ({ activeTab, setActiveTab, completeData }) => {
  const PlayListTitle = completeData.PlayListTitle;
  const userData = completeData.userData;
  const playlistVideos = completeData.PlaylistVideos;
  const availableVideos = playlistVideos.filter((video) => userData.hasOwnProperty(video))
  return (
    <div className='bg-[#323639] flex items-center justify-between'>
      <div className='flex  items-center'>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isList={completeData.list} />
        <p style={{ color: "#f1f1f1", textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap' }} className='mb-0.5 text-sm max-w-[280px]'>{PlayListTitle}</p>
      </div>
      <div>
        {availableVideos.length>0 && <PDFDownloadLink document={<CompleteListDocument completeData={completeData} />} fileName={`${PlayListTitle}.pdf`}>
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
const fetchVideosList = async (playlistId) => {
  console.log('vidlist');
  const API_KEY = process.env.YOUTUBE_DATA_API;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log("response", response);
    const videoIds = response.data.items.map(item => item.snippet.resourceId.videoId);
    const playlistTitle = response.data.items[0].snippet.title;
    return { videoIds, playlistTitle }
  } catch (e) {
    console.log("Error fetching videos ", e);
    return null;
  }

}
function App() {
  const [activeTab, setActiveTab] = useState("pdf");
  const [completeData, setCompleteData] = useState({
    list: null,
    videoId: null,
    userData: {},
    PlaylistVideos: [],
    PlayListTitle: null
  });
  const [notYoutube, setNotYoutube] = useState(false);
  useEffect(() => {
    getVideoData();
  }, [])
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
        const ListId = urlParameters.get('list');
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
                  PlayListTitle: data.playlistTitle
                })
              }
            }
            else {
              setCompleteData({
                list: null,
                currentVideo: videoId,
                userData: userData,
                PlaylistVideos: [],
                PlayListTitle: ""
              })
            }
          }
        });
      } else {
        setActiveTab('Not Youtube')
      }
    });
  }


  switch (activeTab) {
    case 'pdf':
        return (
          <div className='flex flex-col w-full bg-[#525659] h-screen'>
            <div className='sticky top-0'>
              <Header activeTab={activeTab} setActiveTab={setActiveTab} isList={completeData.list} videoData={completeData.userData[completeData.currentVideo]} />
            </div>
            {completeData.userData[completeData.currentVideo] && <PDFViewer showToolbar={false} height={"100%"} width={"100%"}>
              <MYDocument videoData={completeData.userData[completeData.currentVideo]} />
            </PDFViewer>}
          </div>
        )

    case "list":
      return (
        <div className='flex flex-col w-full bg-[#525659] h-screen'>
          <div className='sticky top-0'>
            <CompleteListHeader activeTab={activeTab} setActiveTab={setActiveTab} completeData={completeData} />
          </div>
            <PDFViewer showToolbar={false} height={"100%"} width={"100%"}>
              <CompleteListDocument completeData={completeData} />
            </PDFViewer>
        </div>
      )

    default:
      return (
        <StartingScreen notYoutube={true} />
      )
  }
}

export default App;
