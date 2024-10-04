import { Page, Text, View, Document, Image, Link, Line } from '@react-pdf/renderer';
import styles from '../Styles/Styles';


export default function MYDocument({ videoData }) {
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
              <Link target="_blank" href="https://frametagger.com" style={{ height: "20px", bottom: "0", right: "30px", position: "absolute" }}>Created Using Frametagger</Link>
            </View>
          </Page>
        </Document>
      )
    } else {
      return null
    }
  }