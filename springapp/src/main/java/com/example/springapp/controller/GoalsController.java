package com.example.springapp.controller;



import com.example.springapp.account.Account;
import com.example.springapp.goals.Goal;
import com.example.springapp.goals.GoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class GoalsController {

    @Autowired
    private GoalsService goalsService;

    //API EndPoint for creating a Goal
    @PostMapping("/api/goals")
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        Goal createdGoal = goalsService.createGoal(goal);
        return new ResponseEntity<>(createdGoal, HttpStatus.CREATED);
    }

    //API EndPoint for Updating the existing a Goal
    @PutMapping("/api/goals/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable("id") Long id, @RequestBody Goal goal) {
        Goal updatedGoal = goalsService.updateGoal(id, goal);
        return new ResponseEntity<>(updatedGoal, HttpStatus.OK);
    }

    //API EndPoint for Deleting the existing Goal
    @DeleteMapping("/api/goals/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable("id") Long id) {
        goalsService.deleteGoal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //API EndPoint for fetching a particular existing Goal
    @GetMapping("/api/goals/{id}")
    public ResponseEntity<Goal> getGoal(@PathVariable("id") Long id) {
        Optional<Goal> goal = goalsService.getGoal(id);
        if (goal.isPresent()) {
            return new ResponseEntity<>(goal.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //API EndPoint for fetching all the existing goals
    @GetMapping("/api/goals")
    public ResponseEntity<List<Goal>> getAllGoals() {
        List<Goal> goals = goalsService.getAllGoals();
        return new ResponseEntity<>(goals, HttpStatus.OK);
    }

    @GetMapping("/goals")
    public ResponseEntity<List<Goal>> getAllTestGoals(){
        List<Goal> goals = new ArrayList<>();
        return ResponseEntity.ok(goals);
    }

    //Test Case
    @GetMapping("/goals/{id}")
    public ResponseEntity<List<Goal>> getTestGoalsById(@PathVariable Integer id){
        List<Goal> goals = new ArrayList<>();
        return ResponseEntity.ok(goals);
    }

}
