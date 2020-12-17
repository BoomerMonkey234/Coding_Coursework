package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

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


    @GET
    @Path("list")
    public String UsersList() {
        System.out.println("Invoked Songs.List()");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT SongName FROM Songs");
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {
                JSONObject row = new JSONObject();
                row.put("SongName", results.getString(1));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }


}
