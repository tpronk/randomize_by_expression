# Introduction
Sequences of trials in reaction times can often have specific order restrictions, such as:
* Randomize blocks and trials in blocks
* Alternate certain trial types
* Limit the number of times a particular trial type is repeated
* Have a fixed set of trials at the beginning or end of a sequence

Writing algorithms that generate random sequences with such order restrictions can be cumbersome, error-prone, and boring. Randomize by Expression (RbE) is a solution to these issues by generating sequences via an expression, similar to a mathematical formula.

## Core Operations
RbE supports the following five operations. 

| Operation | Description                                                                               |
|:----------|:------------------------------------------------------------------------------------------|
| seq       | Present the operands in sequence                                                          |
| alt       | Alternate the elements of the operands                                                    |
| one       | Randomly pick one of the operands                                                         |
| rnd       | Present operands in order, but do not affect the order of elements inside of the operands |
| shu       | Present all the elements in the operands in random order                                  |

## Sets and Elements
As trials are often are often organized in relatively large sets, terms in the expression may refer to a single element or a collection of elements. 

# Basic Examples
In the examples below, we will use two terms that each refer to a collection of two trials.
```
co_tri: [ct_1, ct_2] # compatible trials
in_tri: [it_1, it_2] # incompatible trials
```
In each example, first the expression is show, followed by all possible sequences that can be generated from this expression.

## Present compatible and incompatible trials
```
seq(co_tri, in_tri)
[ct_1, ct_2, it_1, it_2]
```

## Alternate compatible and incompatible trials
```
alt(co_tri, in_tri)
[ct_1, it_1, ct_2, it_2]
```

## Present either compatible or incompatible trials 
```
one(co_tri, in_tri)
[ct_1, ct_2]
[it_1, it_2]
```

## Random order of compatible and incompatible blocks 
```
rnd(co_tri, in_tri)
[ct_1, ct_2, it_1, it_2]
[it_1, it_2, ct_1, ct_2]
```

## Shuffle compatible trials 
```
shu(co_tri)
[ct_1, ct_2]
[ct_2, ct_1]
```

# Advanced example
Below is a more advanced example, representing a task design that always starts with an introduction slide, followed by either compatible or incompatible block, followed by a slide introducing the second block, followed by the block not yet presented. The order of blocks (compatible followed by incompatible versus incompatible followed by compatible) is randomly picked for each participation, while trial order is randomized within blocks.
## Sets
```
fi_sli               # first slide
se_sli               # second slide
co_tri: [ct_1, ct_2] # compatible trials
in_tri: [it_1, it_2] # incompatible trials
```
## Expression
seq(fi_sli, one(
  seq(shu(co_tri), se_sli, shu(in_tri)),
  seq(shu(in_tri), se_sli, shu(co_tri))
))
## Output
[fs_1, ct_1, ct_2, ss_1, it_1, it_2]
[fs_1, ct_1, ct_2, ss_1, it_2, it_1]
[fs_1, ct_2, ct_1, ss_1, it_1, it_2]
[fs_1, ct_2, ct_1, ss_1, it_2, it_1]

Approximate Combinator
While the randomization by expression takes care of generating random sequences, generating the sets of trials involved in this randomization often involves a complete or approximate combination of a list of features. For example:
�	Present trials with a green or blue dot positioned left or right side, such that there is an equal number of trials with dots green-left, green-right, blue-left, and blue-right.
�	Present X stimuli over Y trials, such that stimuli are preferably exact, but at least approximately presented the same number of times.
To facilitate factories in generating such trial sets, the randomizer contains an approximate combinatorics library (Table 7).
Table 7. Functions provided by the Randomizer approximate combinatorics library
Function	Description
fill	Fill sequence of length L with E elements, such that the frequency of each element of E is the same. If length L does not allow this, keep the frequencies as close as possible, randomly picking additional elements from E to fill up L. For example:
fill([s1, s2], 3)
[s1, s1, s2]
[s1, s2, s2]
