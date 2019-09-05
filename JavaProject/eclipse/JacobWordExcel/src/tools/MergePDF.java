package tools;

import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.exceptions.COSVisitorException;
import org.apache.pdfbox.util.PDFMergerUtility;


public class MergePDF {
    private static String[] getFiles(String folder) throws IOException {
        File _folder = new File(folder);
        String[] filesInFolder;

        if (_folder.isDirectory()) {
            filesInFolder = _folder.list();
            return filesInFolder;
        } else {
            System.out.println(_folder.isDirectory());
            throw new IOException("Path is not a directory");
        }
    }

    public void mergePdf(String filePath, String mergeFileName) throws IOException, COSVisitorException {
        PDFMergerUtility mergePdf = new PDFMergerUtility();

        String folder = filePath;
        String destinationFileName = mergeFileName;
        String[] filesInFolder = getFiles(folder);

        for (int i = 0; i < filesInFolder.length; i++)
            mergePdf.addSource(folder + File.separator + filesInFolder[i]);

        mergePdf.setDestinationFileName(destinationFileName);
        mergePdf.mergeDocuments();
    }
}
