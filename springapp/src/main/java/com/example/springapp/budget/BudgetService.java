package com.example.springapp.budget;

import java.util.List;
import java.util.Optional;

public interface BudgetService {

    List<Budget> getAllBudget();
    Optional<Budget> getBudgetById(Long id);
    Budget createBudget(Budget budget);
    Budget updateBudget(Long id, Budget budget);
    void deleteBudget(Long id);
}
