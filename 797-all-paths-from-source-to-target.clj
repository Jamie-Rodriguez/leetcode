;; The JavaScript code for this problem was first solved in Clojure
;; Note how for the recursive case, a list comprehension is used to compute the
;; paths visited so far
(defn dfs [graph current target]
  (if (= current target)
    [[target]]
    (for [neighbor (graph current)
          rest-path (dfs graph neighbor target)]
      (concat [current] rest-path))))


(defn all-paths-source-target [graph]
  (dfs graph 0 (dec (count graph))))


;; Example 1
(def graph1 [[1 2] [3] [3] []])
(println "Example 1:")
(println (all-paths-source-target graph1))

;; Example 2
(def graph2 [[4 3 1] [3 2 4] [3] [4] []])
(println "Example 2:")
(println (all-paths-source-target graph2))
