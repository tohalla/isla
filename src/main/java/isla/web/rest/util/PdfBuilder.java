package isla.web.rest.util;

import java.util.List;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import isla.domain.Comment;

public class PdfBuilder {
    private static final Font TABLE_HEADER = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
    private static final Font TABLE_BODY = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL);
    
    public static ByteArrayOutputStream getCommentsPdf(List<Comment> comments, String file) {
        
        Document document = null;
        
        if (comments.size() > 1) {
            comments.sort((c1, c2) -> Integer.signum(c2.getLiked() - c1.getLiked()));
        }

        try {
            document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(file));

            document.open();

            document.addAuthor("Isla");
            document.addCreator("Isla");
            document.add(new Chunk(""));
            
            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100.0f);
            table.setWidths(new int[] {3, 6, 1});
            PdfPCell cell;

            cell = new PdfPCell((new Phrase("Posted at", TABLE_HEADER)));
            table.addCell(cell);

            cell = new PdfPCell((new Phrase("Content", TABLE_HEADER)));
            table.addCell(cell);

            cell = new PdfPCell((new Phrase("Likes", TABLE_HEADER)));
            table.addCell(cell);

            for (Comment comment : comments) {
                cell = new PdfPCell((new Phrase(comment.getCreatedAt().toString(), TABLE_BODY)));
                table.addCell(cell);
                cell = new PdfPCell((new Phrase(comment.getContent(), TABLE_BODY)));
                table.addCell(cell);
                cell = new PdfPCell((new Phrase("" + comment.getLiked(), TABLE_BODY)));
                table.addCell(cell);
            }

            document.add(table);

            document.close();

        } catch (FileNotFoundException e) {

            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return convertPDFToByteArrayOutputStream(file);
    }

    
    private static ByteArrayOutputStream convertPDFToByteArrayOutputStream(String file) {
 
        InputStream inputStream = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
 
            inputStream = new FileInputStream(file);
            byte[] buffer = new byte[1024];
            baos = new ByteArrayOutputStream();
 
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                baos.write(buffer, 0, bytesRead);
            }
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return baos;
    }

}
