package com.example.springapp.transaction;

import com.example.springapp.account.Account;
import com.example.springapp.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
    List<Transaction> findAllByUser(UserEntity user);


    List<Transaction> findAllByAccount(Account account);
    
    @Query(value="select * from transaction where category_category_id=?1", nativeQuery = true)
    List<Transaction> findByCategory(Integer id);

    @Query(value = "SELECT\n" +
            "    subquery.month,\n" +
            "    COALESCE(expenses, 0) AS expenses,\n" +
            "    COALESCE(income, 0) AS income\n" +
            "FROM (\n" +
            "    SELECT\n" +
            "        MONTHNAME(DATE_SUB(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL n.num MONTH)) AS month,\n" +
            "        ROW_NUMBER() OVER (ORDER BY n.num DESC) AS rn\n" +
            "    FROM\n" +
            "        (SELECT 0 AS num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) AS n\n" +
            ") AS subquery\n" +
            "LEFT JOIN (\n" +
            "    SELECT\n" +
            "        MONTHNAME(FROM_UNIXTIME(t.date_time/1000)) AS month,\n" +
            "        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expenses,\n" +
            "        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income\n" +
            "    FROM transaction t\n" +
            "    JOIN category c ON t.category_category_id = c.category_id\n" +
            "    WHERE\n" +
            "        t.user_id = ?1 AND\n" +
            "        FROM_UNIXTIME(t.date_time/1000) >= DATE_SUB(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 5 MONTH)\n" +
            "    GROUP BY month\n" +
            ") AS data ON subquery.month = data.month\n" +
            "ORDER BY subquery.rn DESC;" ,nativeQuery = true)
    List<Object[]> getMonthlyData(Integer userId);


    @Query(value = "SELECT " +
            "c.name AS category, " +
            "COALESCE(SUM(t.amount), 0) AS expenses " +
            "FROM " +
            "transaction t " +
            "JOIN category c ON t.category_category_id = c.category_id " +
            "WHERE " +
            "t.user_id = ?1 " +
            "AND c.type = 'expense' " +
            "AND MONTH(FROM_UNIXTIME(t.date_time/1000)) = MONTH(NOW()) " +
            "AND YEAR(FROM_UNIXTIME(t.date_time/1000)) = YEAR(NOW()) " +
            "GROUP BY " +
            "c.name " +
            "ORDER BY " +
            "expenses DESC;" ,nativeQuery = true)
    List<Object[]> getThisMonthExpenses(Integer userId);

    @Query(value = "SELECT " +
            "c.name AS category, " +
            "COALESCE(SUM(t.amount), 0) AS income " +
            "FROM " +
            "transaction t " +
            "JOIN category c ON t.category_category_id = c.category_id " +
            "WHERE " +
            "t.user_id = ?1 " +
            "AND c.type = 'income' " +
            "AND MONTH(FROM_UNIXTIME(t.date_time/1000)) = MONTH(NOW()) " +
            "AND YEAR(FROM_UNIXTIME(t.date_time/1000)) = YEAR(NOW()) " +
            "GROUP BY " +
            "c.name " +
            "ORDER BY " +
            "income DESC;" ,nativeQuery = true)
    List<Object[]> getThisMonthIncome(Integer userId);

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(CASE WHEN c.type = 'expense' THEN t.amount END), 0) AS total_expenses,\n" +
            "    COALESCE(SUM(CASE WHEN c.type = 'income' THEN t.amount END), 0) AS total_income\n" +
            "FROM\n" +
            "    transaction t\n" +
            "    JOIN category c ON t.category_category_id = c.category_id\n" +
            "WHERE\n" +
            "    t.user_id = ?1\n" +
            "    AND MONTH(FROM_UNIXTIME(t.date_time/1000)) = MONTH(NOW())\n" +
            "    AND YEAR(FROM_UNIXTIME(t.date_time/1000)) = YEAR(NOW());",nativeQuery = true)
    List<Object[]> getThisMonthTotalIncomeAndExpenses(Integer userId);
}
