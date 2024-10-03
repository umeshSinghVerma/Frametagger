import { Page, Text, View, Document, Image, Link } from '@react-pdf/renderer';
import styles from '../Styles/Styles';

export default function CompleteListDocument({ completeData }) {
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
                <Link target="_blank" href="https://frametagger.com" style={{ height: "20px", bottom: "0", right: "30px", position: "absolute" }}>Created Using Frametagger</Link>
              </View>
            </Page>
          )
        })}
      </Document>)
    }else{
      return null;
    }
  }