package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import server.Main;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;

@Path("songs/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Songs {
    @POST
    @Path("update")
    public String updateSongs(@FormDataParam("SongID") Integer SongID, @FormDataParam("Plays") Integer Plays) {
        try {
            System.out.println("Invoked Users.UpdateUsers/update SongID=" + SongID);
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Songs SET Plays = ? WHERE SongID = ?");
            ps.setInt(1, Plays);
            ps.setInt(2, SongID);
            ps.execute();
            return "{\"OK\": \"Songs updated\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to update item, please see server console for more info.\"}";
        }
    }

}
