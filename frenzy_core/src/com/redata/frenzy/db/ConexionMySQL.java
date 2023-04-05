
package com.redata.frenzy.db;
import java.sql.Connection;
import java.sql.DriverManager;

public class ConexionMySQL {
    Connection conn;
    
    public Connection open(){
        String user = "u2p9cdyt1if5zknd";
        String password = "51EZJZFh4siMNUTeNmk4";
        String url = "jdbc:mysql://u2p9cdyt1if5zknd:51EZJZFh4siMNUTeNmk4@bauyhjrizdpc3kqw4pcm-mysql.services.clever-cloud.com:3306/bauyhjrizdpc3kqw4pcm";
        try
        {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
            return conn;
        } 
        catch(Exception e){
            throw new RuntimeException(e);
        }
    }
    
    public void close(){
        if(conn != null)
        {
            try
            {
                conn.close();
            }
            catch(Exception e)
            {
                e.printStackTrace();
                System.out.println("Exception controlada");
            }
        }
    }
}
