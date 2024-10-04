import { Page, Text, View, Document, StyleSheet, Image, Link, PDFViewer, Font, Line, PDFDownloadLink, } from '@react-pdf/renderer';
import Oswald from '../fonts/Oswald.ttf'

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

export default styles;