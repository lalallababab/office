import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class test {
    public static Connection getConnect() throws SQLException {
        String driver = "com.mysql.cj.jdbc.Driver";
        String url    = "jdbc:mysql://localhost:3306/yeb?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai";
        String username = "root";
        String password = "ly096686";            // Change it to your Password
        System.setProperty(driver,"");

        return DriverManager.getConnection(url,username,password);
    }

    public static void main(String[] args) throws SQLException {
        getConnect();
    }
}
