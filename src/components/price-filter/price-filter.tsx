import React, { useState, useRef, useEffect } from 'react';
import styles from './price-filter.module.css';
import { CiFilter } from "react-icons/ci";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { priceRanges } from '@/app/products/layout-client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PriceFilterComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    // url search params
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentMin = searchParams.get('min');
    const currentMax = searchParams.get('max');
    const selectedIndex = priceRanges.findIndex(range =>
        range.min === Number(currentMin) &&
        range.max === Number(currentMax)
    );
    // redux 
    // const dispatch = useAppDispatch();
    // const { selectedPriceRange } = useAppSelector(state => state.products);
    // const selectedIndex = priceRanges.findIndex(range =>
    //     range.min === selectedPriceRange?.min &&
    //     range.max === selectedPriceRange?.max
    // );

    const handleOptionClick = (index: number): void => {
        const selectedRange = priceRanges[index];
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (selectedRange.min === 0 && selectedRange.max === Infinity) {
            newSearchParams.delete('min');
            newSearchParams.delete('max');
        } else {
            newSearchParams.set('min', selectedRange.min.toString());
            newSearchParams.set('max', selectedRange.max.toString());
        }
        const newPathName = `${pathName}?${newSearchParams.toString()}`;
        router.push(newPathName);
        // redux
        // const selectedRange = priceRanges[index];
        // dispatch(setPriceRange(
        //     selectedRange.min === 0 && selectedRange.max === Infinity ? null : selectedRange
        // ));
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'ArrowDown' && isOpen) {
            e.preventDefault();
            const nextIndex = (selectedIndex + 1) % priceRanges.length;
            handleOptionClick(nextIndex);
        } else if (e.key === 'ArrowUp' && isOpen) {
            e.preventDefault();
            const prevIndex = (selectedIndex - 1 + priceRanges.length) % priceRanges.length;
            handleOptionClick(prevIndex);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={styles.priceFilterContainer} ref={dropdownRef}>
            <button
                className={styles.priceFilter}
                onClick={() => setIsOpen(!isOpen)}
                // onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="price-filter-label"
                type="button"
            ><CiFilter width={30} height={30} />
                <span id="price-filter-label">
                {priceRanges[selectedIndex]?.label || 'Filter by Price'}
                </span>
                <MdOutlineArrowDropDown width={40} height={40}/>
            </button>

            {isOpen && (
                <div className={styles.priceFilterDropdown}>
                    <ul role="listbox" aria-labelledby="price-filter-label">
                        {priceRanges.map((range, index) => (
                            <li
                                key={index}
                                role="option"
                                aria-selected={index === selectedIndex}
                                className={`${styles.priceFilterOption} ${index === selectedIndex ? styles.selected : ''}`}
                                onClick={() => handleOptionClick(index)}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleOptionClick(index);
                                    }
                                }}
                            >
                                {range.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PriceFilterComponent;